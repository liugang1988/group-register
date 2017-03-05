import http from '../../../utils/http';
import Cache from './Cache';

const fn = new Cache({
    load: groupName => http.get('/api/group/v3/auto/select/group', {
        params: {
            groupName
        }
    })
});

export default fn;

