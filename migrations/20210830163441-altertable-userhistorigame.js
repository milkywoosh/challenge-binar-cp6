'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'UserHistoriGames',
        'username_id',
        Sequelize.INTEGER
      );
      await queryInterface.addConstraint('UserHistoriGames', {
        type: 'foreign key',
        fields: ['username_id'],
        name: 'custom_unique_constraint_username',
        references: {
          table: 'UserGames',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'UserHistoriGames',
        
        { transaction }
      );
      await queryInterface.removeColumn(
        'UserHistoriGames',
        'username_id'
      );
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
