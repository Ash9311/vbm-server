const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { authenticate, authorize } = require("../middlewares/middlewares");
const router = express.Router();

router.get("/donations", authenticate, async (req, res) => {
    const donations = await prisma.donation.findMany({
        where: { userId: req.userId },
        include: { user: true }
    });
    res.json(donations);
})

//Admin: view all donations

router.get("/admin/donations", async (req, res) => {
    const donations = await prisma.donation.findMany({
        include: { user: true }
    })
    res.json(donations);
})

//create a new donation

router.post("/donations", authenticate, async (req, res) => {
    const { amount, year } = req.body;

    if (!amount || !year) {
        return res.status(400).json({ error: "Amount and year are required" });
    }

    try {

        const existingDonation = await prisma.donation.findUnique({
            where: {
                userId_year: {
                    userId: req.userId,
                    year: year
                }
            }
        })

        let donation;
        if (existingDonation) {
            donation = await prisma.donation.update({
                where: {
                    id: existingDonation.id
                },
                data: {
                    amount: existingDonation.amount + amount
                }
            })
        }
        else {
            donation = await prisma.donation.update({
                data: {
                    amount,
                    year,
                    userId: req.userId
                }
            });
        }
        res.status(201).json({ message: "Donation successfully recorded.", donation });
    } catch (error) {
        res.status(500).json({ error: "Failed to create donation." })
    }
})

module.exports = router;