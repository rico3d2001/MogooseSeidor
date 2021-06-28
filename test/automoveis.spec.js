const { expect } = require('chai');

const { getByColorAndTradeMark,
      insertNewCar,
      findCarByLicensePlate,
      updateOneCar,
      deleteOneCar,
      countAll,
      getAll } = require('../server/automoveis/automoveisService');

const UUID = require('uuid-js');

describe('Automoveis unity tests', async () => {
      describe('#CRUDAutomoveis', () => {

            it('deve cadastrar um novo automóvel', async () => {

                  //Arrange
                  const expectation = [{
                        placa: "RRP2001",
                        marca: "Fox",
                        cor: "Preta"
                  }];

                  // Act
                  await insertNewCar(expectation[0]);

                  // Assert
                  const result = await getAll();
                  expect(result).to
                        .have.lengthOf(1)
                        .and.deep.equal(expectation);

                  //Restart
                  deleteOneCar(expectation[0].placa);

            });

            it('deve recuperar um automóvel cadastrado pelo identificador unico', async () => {

                  //Arrange
                  const inserted = {
                        placa: 'RRP2001',
                        marca: "Fox",
                        cor: "Preta"
                  };
                  await insertNewCar(inserted);

                  // Act
                  const result = await findCarByLicensePlate(inserted.placa);

                  // Assert
                  expect(result.placa).to.equal(inserted.placa);

                  //Restart
                  deleteOneCar(inserted.placa);

            });

            it('deve atualizar um automóvel cadastrado', async () => {

                  //Arrange
                  const insertionDoc = {
                        placa: 'RRP2001',
                        marca: "Fox",
                        cor: "Preta"
                  };
                  await insertNewCar(insertionDoc);

                  const expectation = [{
                        placa: "RRP2001",
                        marca: "Fiat",
                        cor: "Branca"
                  }];


                  // Act
                  await updateOneCar(expectation[0]);

                  // Assert
                  const result = await getAll();
                  expect(result).to
                        .have.lengthOf(1)
                        .and.deep.equal(expectation);

                  //Restart
                  deleteOneCar(expectation[0].placa);

            });



            it('deve excluir um automóvel cadastrado', async () => {

                  //Arrange
                  const insertionDoc = {
                        placa: 'RRP2001',
                        marca: "Fox",
                        cor: "Preta"
                  };
                  await insertNewCar(insertionDoc);

                  // Act
                  await deleteOneCar(insertionDoc.placa);

                  // Assert
                  const quantidadeDados = await countAll();
                  expect(quantidadeDados).to.equal(0);

            });

            it('deve listar os automóveis por cor e marca', async () => {

                  //Arrange
                  await insertNewCar({ placa: 'HGB4567', marca: "Fiat Uno", cor: "Cinza" });
                  await insertNewCar({ placa: 'MGF0987', marca: "Fiesta", cor: "Amarelo" });
                  await insertNewCar({ placa: 'RRP2001', marca: "Fox", cor: "Preta" });
                  await insertNewCar({ placa: 'CYZ9087', marca: "Celta", cor: "Azul" });
                  await insertNewCar({ placa: 'JVM7879', marca: "Celta", cor: "Azul" });


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
                  expect(result).to
                  .have.lengthOf(2)
                  .and.deep.equal(expectation);

                  //Restart
                  await deleteOneCar('HGB4567');
                  await deleteOneCar('MGF0987');
                  await deleteOneCar('RRP2001');
                  await deleteOneCar('CYZ9087');
                  await deleteOneCar('JVM7879');

            });

      });

});
