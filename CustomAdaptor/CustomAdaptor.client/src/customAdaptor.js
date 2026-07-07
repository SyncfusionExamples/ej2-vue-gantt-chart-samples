import { ODataV4Adaptor } from '@syncfusion/ej2-data';

export class CustomAdaptor extends ODataV4Adaptor {

    processQuery(dm, query) {
        return super.processQuery(dm, query);
    }

    beforeSend(dm, request, settings) {
        // request.headers.set('Authorization', 'true');

        return super.beforeSend(dm, request, settings);
    }

    processResponse() {
        const original = super.processResponse.apply(this, arguments);
        return original;
    }
}
