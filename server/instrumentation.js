import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
if (process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) {
 const sdk = new NodeSDK({ traceExporter: new OTLPTraceExporter() });
 sdk.start();
 process.once('SIGTERM', () => { sdk.shutdown().catch(() => {}); });
}
