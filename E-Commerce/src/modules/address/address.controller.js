import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import { User } from "../../database/models/user.model.js";

const addAddress = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  const addresses = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { addresses: req.body } },
    { new: true }
  );
  /*
  or:
  user.addresses.push(req.body);
  await user.save();
  */
  if (!addresses) {
    return next(new SystemError("Addresses not found", 404));
  }
  res.status(200).json({ message: "success", addresses: addresses.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  const addresses = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { addresses: req.params.id } },
    { new: true }
  );
  /*
  or:
  user.addresses = user.addresses.filter((id) => id !== req.params.id);
  await user.save();
  */
  if (!addresses) {
    return next(new SystemError("Addresses not found", 404));
  }
  res.status(200).json({ message: "success", addresses: addresses.addresses });
});

const getAddresses = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  const addresses = await User.findById(req.user.id, { addresses: 1 });
  // or: const addresses = await User.findById(req.user.id).populate("addresses");
  // or: const addresses = await Product.find({ _id: { $in: user.addresses } });
  if (!addresses) {
    return next(new SystemError("Addresses not found", 404));
  }
  res.status(200).json({ message: "success", addresses: addresses.addresses });
});

export { addAddress, getAddresses, removeAddress };
