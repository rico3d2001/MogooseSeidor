const { expect } = require('chai');

const { getByColorAndTradeMark, 
      insertNewCar, 
      findCarByLicensePlate, 
      updateOneCar, 
      deleteOneCar,
      countCarByLicensePlate } = require('../server/automoveis/automoveisService');
const UUID = require('uuid-js');

describe('Automoveis unity tests', async () => {
      describe('#CRUDAutomoveis', () => {

            it('deve cadastrar um novo automóvel', async () => {

                  //Arrange
                  const expectation = {
                        placa: "RRP2001",
                        marca: "Fox",
                        cor: "Preta"
                  };

                  // Act
                  await insertNewCar(expectation);
                  const result = await findCarByLicensePlate(expectation.placa);

                  // Assert
                  expect(result.placa).to.equal(expectation.placa);

            });

            it('deve recuperar um automóvel cadastrado pelo identificador unico', async () => {

                  //Arrange
                  const expectation = {
                        placa: 'RRP2001',
                        marca: "Fox",
                        cor: "Preta"
                  };

                  // Act
                  const result = await findCarByLicensePlate(expectation.placa);

                  // Assert
                  expect(result.placa).to.equal(expectation.placa);
            });

            it('deve atualizar um automóvel cadastrado', async () => {

                  //Arrange
                  const expectation = {
                        placa: "RRP2001",
                        marca: "Fox",
                        cor: "Branca"
                  };

                  // Act
                  await updateOneCar(expectation);
                  
                  // Assert
                  const result = await findCarByLicensePlate(expectation.placa);
                  expect(result.cor).to.equal(expectation.cor);

            });



            it('deve excluir um automóvel cadastrado', async () => {

                  //Arrange
                  const placa = 'RRP2001';

                  // Act
                  deleteOneCar(placa);
                  const result = await countCarByLicensePlate(placa);

                  // Assert
                  expect(result).to.equal(0);

            });

            it('deve listar os automóveis por cor e marca', async () => {

                  //Arrange
                  const expectation = [
                        {
                              placa: 'CYZ9087',
                              marca: "Celta",
                              cor: "Azul"
                        },
                        {
                              placa: 'JVM7879',
                              marca: "Celta",
                              cor: "Azul"
                        }
                  ];

                  // Act
                  const result = await getByColorAndTradeMark(expectation[0].cor, expectation[0].marca);

                  // Assert
                  expect(result).to.have.lengthOf(2);

            });
            
      });

});
