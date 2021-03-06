import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeckListComponent} from './deck-list.component';
import {SharedModule} from "../shared.module";
import {Observable} from "rxjs/Observable";
import {Deck, DeckId} from "../deck/deck";
import {DeckService} from "../deck/deck.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('DeckListComponent', () => {
    let component: DeckListComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;
    let debugElement: DebugElement;

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>,
        getDecks: (id) => void
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations: [TestComponentWrapper, DeckListComponent],
            providers: [{provide: DeckService, useValue: deckServiceStub}],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 3 test decks', () => {
        expect(component.decks.length).toEqual(3);
    });

    it('should have the correct edit permissions', () => {
        expect(component.canEdit).toEqual(true);
    });

    it('should have the correct adding permissions', () => {
        expect(component.canAdd).toEqual(true);
    });

    it('should have a first deck with a name of test_deck1', () => {
        let deckName: HTMLElement = debugElement.query(By.css('.deck-name')).nativeElement;
        expect(deckName.innerText).toEqual("test_deck1");
    });

    it('should have a play button', () => {
        let playButton: HTMLElement = debugElement.query(By.css('.play-button')).nativeElement;
        expect(playButton).toBeTruthy();
    });

    it('should have a play button that contains an arrow icon and the word play', () => {
        let playButton: HTMLElement = debugElement.query(By.css('.play-button')).nativeElement;
        expect(playButton.innerText).toEqual("play_arrow Play");
    });


});

@Component({
    selector: `test-component-wrapper`,
    template: `
        <app-deck-list [decks]="decks" [canEdit]="true" [canAdd]="true"></app-deck-list>`
})
class TestComponentWrapper {
    deck1: DeckId = {
        id: "id1",
        name: "test_deck1"
    };

    deck2: DeckId = {
        id: "id2",
        name: "test_deck2"
    };

    deck3: DeckId = {
        id: "id3",
        name: "test_deck3"
    };

    decks: DeckId[] = [this.deck1, this.deck2, this.deck3];
}
