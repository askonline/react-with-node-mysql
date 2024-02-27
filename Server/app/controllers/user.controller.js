exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
   res.status(200).send({ message: "Authorized User !",status:1 });
};

exports.adminBoard = (req, res) => {
  res.status(200).status({message:"Authorized User !",status:1 })
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send({message : "Authorized User !",status:1 });
};



