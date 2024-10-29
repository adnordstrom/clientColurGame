import { ComponentFixture,TestBed,fakeAsync,tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Card } from './models/card';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockDeck: Card[] = [
    { id: 1, colour: 'heart',  isRevealed: false },
    { id: 2, colour: 'diamond',  isRevealed: false },
    { id: 3, colour: 'heart', isRevealed: false },
    { id: 4, colour: 'spade', isRevealed: false },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    
    component.shuffledDeck = mockDeck;
    component.selectedCards = [];
    component.points = 0;
    component.disableCardSelection = false;


  });

  it('should increase points by one if selected cards are matching', fakeAsync(() => {
    component.selectedCards = [mockDeck[0], mockDeck[2]]; // Both cards have the 'heart' colour
    component.checkMatch();

    tick(2000); // Fast-forward the timeout

    expect(component.points).toBe(1);
  }));
  it('should deduct one point if selected cards are not matching', fakeAsync(() => {
    component.selectedCards = [mockDeck[0], mockDeck[1]]; // Different colours
    component.checkMatch();

    tick(2000); // Fast-forward the timeout

    expect(component.points).toBe(-1);
  }));


});
