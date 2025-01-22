import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import { User } from "../../../database/models/user.model.js";

const addToWishlist = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  const wishlist = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  );
  /*
  or:
  user.wishlist.push(req.body.product);
  await user.save();
  */
  if (!wishlist) {
    return next(new SystemError("Wishlist not found", 404));
  }
  res.status(200).json({ message: "success", wishlist: wishlist.wishlist });
});

const removeFromWishlist = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  const wishlist = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: req.params.id } },
    { new: true }
  );
  /*
  or:
  user.wishlist = user.wishlist.filter((id) => id !== req.params.id);
  await user.save();
  */
  if (!wishlist) {
    return next(new SystemError("Wishlist not found", 404));
  }
  res.status(200).json({ message: "success", wishlist: wishlist.wishlist });
});

const getWishlist = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  const wishlist = await User.findById(req.user.id, { wishlist: 1 });
  // or: const wishlist = await User.findById(req.user.id).populate("wishlist");
  // or: const wishlist = await Product.find({ _id: { $in: user.wishlist } });
  if (!wishlist) {
    return next(new SystemError("Wishlist not found", 404));
  }
  res.status(200).json({ message: "success", wishlist: wishlist.wishlist });
});

export { addToWishlist, getWishlist, removeFromWishlist };
