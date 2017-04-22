import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    HostListener, ElementRef, AfterContentInit, ViewContainerRef, ViewChild, AfterViewInit, Renderer
}      from '@angular/core';
import {FireFactoryService} from "../providers/fire.provider";

@Component({
    selector: '[ac-autocomplete]',
    templateUrl: 'app/core/autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {
    @Input() autocompleteData: FireFactoryService;
    @Input() autocompleteToShow: Array<any>;
    @Input() autocompleteSearchBy: Array<any>;

    response: Array<any> = [];
    private visible: boolean = true;
    private alreadySelected: boolean = false;
    private focused: boolean = true;

    private selected: any = {};
    private indexSelected: number = 0;

    @Output()
    change: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('tpl') tpl;

    constructor(private _el: ElementRef) {
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this._el.nativeElement.parentNode.appendChild(this.tpl.nativeElement);
    }

    @HostListener('keyup', ['$event'])
    filter(event: Event) {
        this.alreadySelected = false;
        this.show(event);
    }

    @HostListener('focus', ['$event'])
    foco(event: Event) {
        this.show(event);
    }

    @HostListener('click', ['$event'])
    click(event: Event) {
        this.alreadySelected = false;
        this.show(event);
        // this.selected = this.response[this.indexSelected];
        // console.log(this.selected);
    }

    @HostListener('blur', ['$event'])
    leave(event: Event) {
        setTimeout(() => {
            this.focused = false;
            this.determineVisibility();
        }, 100);
    }

    select(index) {
        this.indexSelected = index;
        this.focused = false;
        this.selected = this.response[this.indexSelected];
        console.log(this.selected);
        this.determineVisibility();
    }

    over(index) {
        this.indexSelected = index;
        this.focused = true;
        this.determineVisibility();

    }

    show(event: Event) {
        this.autocompleteData.filter(this.autocompleteSearchBy, event.target['value'], 'false');

        let subs = this.autocompleteData.filter$.subscribe(data=> {
            this.focused = data.data.length > 0;
            this.response = data.data;
        });
        this.determineVisibility();
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        // Me muevo para abajo en la lista
        if (event.keyCode == 40) {
            this.indexSelected = +((this.indexSelected >= this.response.length ) ? this.response.length : this.indexSelected + 1);
            // select(this.indexSelected);
            // moveCursorToEnd();
        }

        // Me muevo para arriba en la lista
        if (event.keyCode == 38) {
            this.indexSelected = +((this.indexSelected <= 1) ? 1 : this.indexSelected - 1);
            // select(vm.indexSelected);
            // moveCursorToEnd();
        }

        // selecciono
        if (event.keyCode == 13) {
            this.focused = false;
            this.alreadySelected = true;
            this.selected = this.response[this.indexSelected - 1];
            console.log(this.selected);
        }

        this.determineVisibility();
    }


    ngOnChanges(changes: SimpleChanges) {
    }

    determineVisibility() {
        // if (this.focused) {
        this.visible = true;
        // }

        if (!this.focused || this.alreadySelected) {
            this.visible = false;
        }


    }
}
