import * as rp from 'request-promise';
import * as objectAssign from 'object-assign';

export function defaultHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `,
    }
}

export function rpGet(endpoint, params = {}, headers = {}) {
    return rp({
        method: "GET",
        uri: endpoint,
        headers: objectAssign(defaultHeaders(), headers),
        qs: params,
        json: true,
    });
}

export function rpPost(endpoint, body = {}, params = {}, headers = {}, auth = {}) {
    return rp({
        method: "POST",
        uri: endpoint,
        body: body,
        qs: params,
        headers: headers,
        json: true,
    });
}

export function rpPostForm(endpoint, form = {}, params = {}, headers = {}, auth = {}) {
    return rp({
        method: "POST",
        uri: endpoint,
        form: form,
        qs: params,
        headers: headers,
        json: true,
    });
}

export function rpPostFormData(endpoint, fd = {}, params = {}, headers = {}, auth = {}) {
    return rp({
        method: "POST",
        uri: endpoint,
        formData: fd,
        qs: params,
        headers: headers,
        json: true,
    });
}

export function rpPut(endpoint, body = {}, params = {}, headers = {}, auth = {}) {
    return rp({
        method: "PUT",
        uri: endpoint,
        body: body,
        qs: params,
        headers: headers,
        json: true,
    });
}

export function rpDelete(endpoint, params = {}, headers = {}) {
    return rp({
        method: "DELETE",
        uri: endpoint,
        headers: objectAssign(defaultHeaders(), headers),
        qs: params,
        json: true,
    });
}

export function rpPatch(endpoint, body = {}, params = {}, headers = {}, auth = {}) {
    return rp({
        method: "PATCH",
        uri: endpoint,
        body: body,
        qs: params,
        headers: headers,
        json: true,
    });
}
