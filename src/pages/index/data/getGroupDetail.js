import http from '../../../utils/http';
import Cache from './Cache';

const fn = new Cache({
    load: groupId => http.get('/api/group/v3/auto/select/group/detail', {
        params: {
            groupId
        }
    })
});

export default fn;

