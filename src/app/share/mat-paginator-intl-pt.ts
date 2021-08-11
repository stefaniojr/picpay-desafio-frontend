import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class MatPaginatorIntlPt extends MatPaginatorIntl {

    itemsPerPageLabel = 'Exibir';
    nextPageLabel = 'Próxima';
    previousPageLabel = 'Anterior';
    lastPageLabel = 'Última'
    firstPageLabel = 'Primeira'

}
