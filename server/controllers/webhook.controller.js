import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("webhook secret needed");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({ message: "Webhook Verification fail" });
  }

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    await newUser.save();
  }

  if (evt.type === "user.updated") {
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: evt.data.id },
      {
        username:
          evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_img_url,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete(
      {
        clerkUserId: evt.data.id,
      },
      { deleted: true }
    );

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
  }

  return res.status(200).json({ message: "Webhook recieved" });
};
