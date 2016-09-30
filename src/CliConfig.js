import t from 'tcomb';
import Config from './Config';

export default Config.extend({
  intermRepIn: t.String,
  modelOut: t.String,
  apiOut: t.maybe(t.String)
}, 'CliConfig');
