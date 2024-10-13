const Schema = require("../Models/AuthenticationModel.js");



async function SigUp(req, res) {
  try {
    const { name, email, password, diseases } = req.body;

    const isUserExist = await Schema.findOne({ email: email });

    if (isUserExist) { 
      return res.status(400).json({ AlreadyExist: "Account already exists" });
    }

    if (!name || !email || !password || !diseases || diseases.length === 0) {
      return res.status(400).json({ EnterAllDetails: "Please fill all the fields" });
    }

    const processedDiseases = diseases.map((disease) => {
      let avoid = [], use = [];
      // Existing logic remains unchanged
      if (disease === "deuteranopia" || disease === "protanopia") {
        avoid = ["red", "green", "brown", "orange"];
        use = ["blue", "yellow", "purple", "gray"];
      } else if (disease === "tritanopia") {
        avoid = ["blue", "yellow", "green"];
        use = ["red", "pink", "gray", "black"];
      } else if (disease === "monochromacy") {
        avoid = ["all colors"];
        use = ["black", "white", "gray"];
      }

      return { disease, avoid, use };
    });

    const data = new Schema({
      name,
      email,
      password,
      diseases: processedDiseases, 
      otp: "",
      otpExpiresAt: "",
    });

    const d = await data.save();
    return res.status(201).json(d); // Use 201 for resource creation
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ EnterAllDetails: "Please fill all the fields" });
    }

    const isUserExist = await Schema.findOne({ email: email });
    if (!isUserExist) {
      return res.status(404).json({ NotExist: "User does not exist" });
    }

    if (password !== isUserExist.password) {
      return res.status(401).json({ Incorrect: "Incorrect password" });
    }

    return res.status(200).json(isUserExist);
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const deleteAcc = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ userIdRequired: "User ID is required" });
    }

    const user = await Schema.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ userIdNotFound: "User not found" });
    }

    return res.status(200).json({ deleted: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const editAcc = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ userIdRequired: "User ID is required" });
    }
    
    const user = await Schema.findById(userId);
    
    if (!user) {
      return res.status(404).json({ userIdNotFound: "User not found" });
    }
    
    user.name = name;
    await user.save();
    
    return res.status(200).json({ updated: "Account updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  SigUp,
  Login,
  deleteAcc,
  editAcc
};
