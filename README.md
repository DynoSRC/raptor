# raptor
The view rendering engine for the Boring framework.

## Usage:
TODO: Figure out why namespaces aren't working.

1. `npm install`
2. `mkdir protos`
3. Generate JS protos:
```
protoc \
  --proto_path=node_modules/protoceratops/protos/ \
  --js_out=import_style=commonjs,binary:protos/ \
  node_modules/protoceratops/protos/boring/lib/container.proto \
  node_modules/protoceratops/protos/boring/raptor/views/example.proto \
  node_modules/protoceratops/protos/boring/raptor/model.proto \
  node_modules/protoceratops/protos/boring/raptor/view.proto
```
4. `node prototype.js`
