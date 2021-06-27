const { expect } = require('chai');
const { insertNewUse,
    endUse,
    findUseByDriverLicenseAndLicensePlate,
    findUseById,
    getByDriverName,
    deleteOneUse,
    countUseByLicensePlate } = require('../server/use/useService');

describe('Utilizacao de automoveis unity tests', async () => {
    describe('#CRUDUtilizacaoAutomovel', () => {

        it('deve cadastrar um uso por um motorista com data de inicio e motivo', async () => {

            //Arrange
            const placa = "CYZ9087";
            const cnh = "55577700021";
            const motivo = "pega";

            // Act
            const inserido = await insertNewUse(placa, cnh, motivo);

            // Assert
            const result = await findUseById(inserido);

            expect(result.motivo).to.equal(motivo);

        });


        it('deve finalizar o uso por um motorista com data de finalizacao', async () => {

            //Arrange
            const placa = "CYZ9087";
            const cnh = "55577700021";
            const finded = await findUseByDriverLicenseAndLicensePlate(cnh, placa);

            // Act
            await endUse(finded);
            const result = await findUseByDriverLicenseAndLicensePlate(cnh, placa);

            // Assert
            expect(result.dataFim).to.greaterThan(finded.dataFim);

        });


        it('listar registros de uso com nome motorista e informacoes do automovel utilizado', async () => {

            //Arrange
            const nomeMotorista = 'Maria Flor';

            const expectation = [
                /* 1 */
                {
                    "placa": "MGF0987",
                    "cor": "Amarelo",
                    "marca": "Fiesta",
                    "cnh": "890654356",
                    "nome": "Maria Flor"
                },

                /* 2 */
                {
                    "placa": "JVM7879",
                    "cor": "Azul",
                    "marca": "Celta",
                    "cnh": "55577700021",
                    "nome": "Maria Flor"
                },

                /* 3 */
                {
                    "placa": "CYZ9087",
                    "cor": "Azul",
                    "marca": "Celta",
                    "cnh": "55577700021",
                    "nome": "Maria Flor"
                }];

            // Act
            const result = await getByDriverName(nomeMotorista);

            // Assert
            expect(result).to.deep.equal(expectation);

        });
        /*
                it('APENAS PARA AUXILIAR TESTE - excluir ultima utilização cadastrada', async () => {
                    //Arrange
                    placaDocumentToDelete =  "CYZ9087";
        
                    // Act
                    deleteOneUse(placaDocumentToDelete);
                    const result = await countUseByLicensePlate(placaDocumentToDelete);
        
                    // Assert
                    expect(result).to.equal(0);
              });
        */


    });
});