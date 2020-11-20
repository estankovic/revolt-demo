import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleMapPage } from './vehicle-map.page';

describe('VehicleMapPage', () => {
  let component: VehicleMapPage;
  let fixture: ComponentFixture<VehicleMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
