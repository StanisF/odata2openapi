import * as url from 'url';

import { Swagger } from './Swagger';
import { Options } from './Options';
import get from './get';
import parse from './parse';
import convert from './convert';

function odata2openapi(metadataUrl: string, options?: Options): Promise<Swagger> {
  
  const { path, host, protocol } = url.parse(metadataUrl);

  if (!options) {
    options = { basePath: path.replace(/\/\$metadata$/, ""), host };
  }

  return get(protocol, host, path)
    .then(parse)
    .then(function(service) {
      
      /* This fixes an edge case with certain metadata sets such
       * as Microsoft Graph where there are entityTypes but convert
       * was erroring out because these entityTypes were not passed
       * in with options */
      if(service.entityTypes.length > 0 || !options.entityTypes){
        options.entityTypes = service.entityTypes;
      }

      return convert(service.entitySets, options, service.version);
    });
}

export {
  Options,
  odata2openapi,
  convert,
  parse
}

export * from './Swagger';
export * from './Definitions';
export * from './EntityProperty';
export * from './EntityType';
export * from './EntitySet';
export * from './Operation';
export * from './Operation';
export * from './Paths';
export * from './Property';
export * from './Schema';
export * from './PathItem';
export * from './Operation';
export * from './Definitions';
export * from './Options';
export * from './Parameter';
export * from './Reference';
export * from './Response';
export * from './SecurityDefinition';
export * from './SecurityDefinitions';
export * from './SecurityRequirement';
