import { checkCredentials, checkingAuthentication } from "../../../src/store/auth";


jest.mock('../../../src/firebase/providers');

describe('Pruebas en auth thunks', () => {
    
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe llamar a checkingCredentials', async() => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkCredentials());
    })
})