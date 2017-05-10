// Snapshot version
// #docregion
import {ViewChild, Component, OnInit}      from '@angular/core';
import {FireCacheProvider} from '../providers/fire.cache.provider';


@Component({
    selector: 'waiting-component',
    templateUrl: 'app/core/waiting.component.html'
})
export class WaitingComponent implements OnInit {
    // hero: Hero;
    private status: string;

    private fireCacheProvider: FireCacheProvider = new FireCacheProvider();

    constructor() {

    }


    ngOnInit() {
        this.fireCacheProvider.status().subscribe(data=> {
            this.status = data.data['action'];
        });
    }

}
