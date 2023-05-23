import { Injectable } from '@angular/core';

export interface User {
    userId: string;
    name: string;
    sex?: string;
}

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private key: string = 'LiveUser';

    public getUserInfor(): User | null {
        const value = localStorage.getItem(this.key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    }
}
