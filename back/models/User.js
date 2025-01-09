const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Consultant"],
      default: "Consultant",
    },
  },
  { timestamps: true }
);

// Hachage du mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  // Ne pas re-hacher le mot de passe s'il n'a pas été modifié
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Hachage lors de la mise à jour du mot de passe
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.password, salt);
    
    // Remplace le mot de passe par le mot de passe haché
    this.setUpdate({ ...update, password: hashedPassword });
  }

  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
