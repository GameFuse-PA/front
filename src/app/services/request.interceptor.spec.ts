import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request.interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [RequestInterceptor],
        }),
    );

    it('should be created', () => {
        const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
