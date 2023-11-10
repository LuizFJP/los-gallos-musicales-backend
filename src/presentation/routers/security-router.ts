import { VerifyPlayerNameUseCase } from '../../domain/interfaces/use-cases/player/verify-player-name-use-case';
import { DecryptUsernameUseCase } from '../../domain/interfaces/use-cases/security/decrypt-username-use-case';
import { EncryptUsernameUseCase } from '../../domain/interfaces/use-cases/security/encrypt-username-use-case';
import { Router } from "express";

export function SecurityRoute(
    encryptUsername: EncryptUsernameUseCase,
    decryptUsername: DecryptUsernameUseCase,
    verifyPlayerName: VerifyPlayerNameUseCase
) {

    const router = Router();

    router.post('/encrypt', async (req, res) => {
        try {
            const {username, roomName} = req.body;
            const validName = await verifyPlayerName.execute(username, roomName);
            const encryptedUsername = await encryptUsername.execute(validName);
            res.json(encryptedUsername);
        } catch (error) {
            console.log(error);
            res.json(undefined);
        }
    });

    router.post('/decrypt', async (req, res) => {
        try {
            const decryptedUsername = await decryptUsername.execute(req.body.username);
            res.json(decryptedUsername);
        } catch (error) {
            console.log(error);
            res.json(undefined);
        }
    });

    return router;
}