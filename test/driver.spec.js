const { expect } = require('chai');
const { insertNewDriver,
      findDriverByLicense,
      updateOneDriver,
      deleteOneDriver,
      getByName,
      countDriverByLicense } = require('../server/motorista/motoristaService');

const nodemon = require('nodemon');


describe('Motoristas unity tests', async () => {
      describe('#CRUDMotoristas', () => {


            it('deve cadastrar um novo motorista', async () => {

                  //Arrange
                  const expectation = {
                        nome: "Ricardo Pinto",
                        cnh: "666999444"
                  };

                  // Act
                  await insertNewDriver(expectation);
                  const result = await findDriverByLicense(expectation.cnh);

                  // Assert
                  expect(result.cnh).to.equal(expectation.cnh);

            });

            it('deve recuperar um motorista cadastrado pelo identificador unico', async () => {

                  //Arrange
                  const expectation = {
                        nome: "Ricardo Pinto",
                        cnh: "666999444"
                  };

                  // Act
                  const result = await findDriverByLicense(expectation.cnh);

                  // Assert
                  expect(result.cnh).to.equal(expectation.cnh);
            });

            it('deve atualizar um motorista cadastrado', async () => {

                  //Arrange
                  const expectation = {
                        nome: "Joao Pio",
                        cnh: "666999444"
                  };

                  // Act
                  await updateOneDriver(expectation);


                  // Assert
                  const result = await findDriverByLicense(expectation.cnh);
                  expect(result.nome).to.equal(expectation.nome);
            });


            it('deve excluir um motorista cadastrado', async () => {
                  //Arrange
                  const expectation = {
                        nome: "Joao Pio",
                        cnh: "666999444"
                  };

                  // Act
                  deleteOneDriver(expectation.cnh);
                  const result = await countDriverByLicense(expectation.cnh);

                  // Assert
                  expect(result).to.equal(0);
            });

            it('deve listar os motoristas por nome', async () => {

                  //Arrange
                  const nomeTeste = "Maria Flor";

                  // Act
                  const result = await getByName(nomeTeste);

                  // Assert
                  expect(result).to
                        .have.lengthOf(2);
            });

      });
});