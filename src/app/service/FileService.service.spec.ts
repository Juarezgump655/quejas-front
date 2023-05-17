/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileServiceService } from './FileService.service';

describe('Service: FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileServiceService]
    });
  });

  it('should ...', inject([FileServiceService], (service: FileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
