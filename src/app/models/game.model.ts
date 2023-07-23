import { User } from './user.model';
import { ApiFile } from './api-file.model';

export class Game {
    _id?: string;
    name?: string;
    description?: string;
    banner?: File & ApiFile;
    program?: File & ApiFile;
    entry?: File & ApiFile;
    createdBy?: User;
    maxPlayers?: number;
    minPlayers?: number;
    language?: string;
}
