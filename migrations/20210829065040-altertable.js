'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'UserBiodata',
        'user_id',
        Sequelize.INTEGER
      );
      await queryInterface.addConstraint('UserBiodata', {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'usergame_usergamebiodata_id_fkey',
        references: {
          table: 'UserGames',
          field: 'id',
        },
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
        'UserBiodata',
        'usergame_usergamebiodata_username_fkey',
        { transaction }
      );
      await queryInterface.removeColumn(
        'UserBiodata',
        'user_id'
      );
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
