'use strict';

const availableSlots = [
  { time: '10:00 AM - 11:00 AM', createdAt: new Date(), updatedAt: new Date() },
  { time: '11:00 AM - 12:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '12:00 PM - 01:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '02:00 PM - 03:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '03:00 PM - 04:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '04:00 PM - 05:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '05:00 PM - 06:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '06:00 PM - 07:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '07:00 PM - 08:00 PM', createdAt: new Date(), updatedAt: new Date() },
  { time: '08:00 PM - 09:00 PM', createdAt: new Date(), updatedAt: new Date() },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('slots', availableSlots, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('slots', null, {});
  }
};
