import { DecryptUsernameUseCase } from '../../domain/interfaces/use-cases/security/decrypt-username-use-case';
import { EncryptUsernameUseCase } from '../../domain/interfaces/use-cases/security/encrypt-username-use-case';
import { Router } from "express";

export function SecurityRoute(
    encryptUsername: EncryptUsernameUseCase,
    decryptUsername: DecryptUsernameUseCase
) {

    const router = Router();

    router.post('/encrypt', async (req, res) => {
        try {
            const encryptedUsername = await encryptUsername.execute(req.body.username);
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