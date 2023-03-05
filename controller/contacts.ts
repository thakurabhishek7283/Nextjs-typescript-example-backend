import { Request, Response } from "express";
import ContactModal from "../model/contacts";

export const fetchContactList = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const contacts = await ContactModal.find({
      userId,
    }).select("_id contactName contactNumber");
    return res.status(200).json({
      contactList: contacts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { contactName, contactNumber } = req.body;
    const { contactId } = req.params;
    const updatedContact = await ContactModal.findByIdAndUpdate(
      contactId,
      { contactName, contactNumber },
      { new: true }
    ).select("contactName contactNumber _id");
    return res.status(200).json({ updatedContact });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    await ContactModal.deleteOne({ _id: contactId });
    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { contactName, contactNumber, userId } = req.body;
    const contact = new ContactModal({ contactName, contactNumber, userId });
    const data = await contact.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};
