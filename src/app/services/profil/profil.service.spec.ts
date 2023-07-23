import { TestBed } from '@angular/core/testing';

import { ProfilService } from './profil.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfilService', () => {
    let service: ProfilService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(ProfilService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
