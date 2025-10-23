---
name: deployment-pipeline
description: CI/CD pipeline automation, deployment strategies, infrastructure management, and release orchestration
version: "1.0.0"
category: devops
author: js-app-team
---

# Deployment Pipeline Skill

Comprehensive CI/CD pipeline automation and deployment orchestration tool for managing releases across environments with safety and reliability.

## Features

### 🚀 **CI/CD Pipeline Management**
- Automated build, test, and deployment pipeline configuration
- Multi-environment deployment strategies (dev, staging, production)
- Quality gates and automated validation checks
- Rollback procedures and deployment safety mechanisms

### 🏗️ **Infrastructure Automation**
- Infrastructure as Code implementation and management
- Container orchestration and service management
- Environment provisioning and configuration management
- Scaling and performance optimization strategies

### 📊 **Monitoring & Observability**
- Deployment monitoring and health checks
- Performance metrics and alerting configuration
- Log aggregation and analysis automation
- Incident response and escalation procedures

### 🔧 **Release Management**
- Release planning and coordination automation
- Feature flag management and gradual rollouts
- Release validation and acceptance testing
- Post-deployment monitoring and verification

## Usage

### Pipeline Setup
```
Create a comprehensive CI/CD pipeline for the JavaScript application with automated testing, security scanning, and multi-environment deployment
```

### Deployment Strategy
```
Design and implement a blue-green deployment strategy for production releases with zero downtime and automatic rollback capabilities
```

### Infrastructure Management
```
Set up infrastructure as code using Terraform for our cloud deployment with proper security configurations and monitoring
```

### Release Orchestration
```
Plan and execute a production release with feature flags, gradual rollout, and comprehensive monitoring
```

## Deployment Pipeline Framework

### 1. Pipeline Architecture
```yaml
# Multi-Stage Pipeline Configuration
stages:
  - name: validation
    type: quality-gate
    checks:
      - type-checking
      - linting
      - unit-tests
      - security-scan

  - name: build
    type: compilation
    steps:
      - dependency-installation
      - application-build
      - artifact-creation
      - vulnerability-scanning

  - name: test
    type: validation
    suites:
      - integration-tests
      - e2e-tests
      - performance-tests
      - accessibility-tests

  - name: deploy-staging
    type: deployment
    environment: staging
    strategy: blue-green
    validations:
      - smoke-tests
      - integration-validation
      - performance-benchmarks

  - name: deploy-production
    type: deployment
    environment: production
    strategy: canary
    validations:
      - health-checks
      - monitoring-verification
      - rollback-readiness
```

### 2. Deployment Strategies
```typescript
// Blue-Green Deployment
interface BlueGreenDeployment {
  currentVersion: string;
  newVersion: string;
  blueEnvironment: Environment;
  greenEnvironment: Environment;
  switchStrategy: 'immediate' | 'gradual';
  rollbackPlan: RollbackPlan;
}

// Canary Deployment
interface CanaryDeployment {
  trafficSplitting: {
    stages: Array<{
      percentage: number;
      duration: number;
      validationChecks: ValidationCheck[];
    }>;
  };
  monitoring: {
    metrics: string[];
    thresholds: Record<string, number>;
    alertRules: AlertRule[];
  };
  rollbackTriggers: RollbackTrigger[];
}

// Rolling Deployment
interface RollingDeployment {
  strategy: 'rolling' | 'recreate';
  updatePolicy: {
    maxUnavailable: number;
    maxSurge: number;
    progressDeadlineSeconds: number;
  };
  healthChecks: HealthCheck[];
  preStopHooks: PreStopHook[];
}
```

### 3. Infrastructure as Code
```typescript
// Terraform Configuration
resource "vercel_project" "web_app" {
  name      = "js-app-${var.environment}"
  framework = "nextjs"

  build_command = "bun run build"
  output_directory = "dist"
  install_command = "bun install"

  environment_variables = {
    NODE_ENV = var.environment
    DATABASE_URL = var.database_url
    NEXTAUTH_URL = var.nextauth_url
    NEXTAUTH_SECRET = var.nextauth_secret
  }

  build_environment {
    NODE_ENV = "production"
  }
}

resource "turso_database" "app_db" {
  name = "js-app-${var.environment}"
  location = "close"
  group = var.environment === "production" ? "production" : "development"

  # Enable backups for production
  backups = var.environment === "production" ? true : false
}

resource "cloudflare_record" "app_dns" {
  zone_id = var.cloudflare_zone_id
  name    = var.environment === "production" ? "app" : "${var.environment}-app"
  value   = vercel_project.web_app.domains[0]
  type    = "CNAME"
  ttl     = 3600
}

// Kubernetes Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: js-app-${var.environment}
  labels:
    app: js-app
    environment: var.environment
spec:
  replicas: var.environment === "production" ? 3 : 1
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: js-app
      environment: var.environment
  template:
    metadata:
      labels:
        app: js-app
        environment: var.environment
    spec:
      containers:
      - name: js-app
        image: ${var.image_registry}/js-app:${var.image_tag}
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: var.environment
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: js-app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 4. Monitoring & Observability
```typescript
// Monitoring Configuration
interface MonitoringConfig {
  metrics: {
    application: {
      responseTime: {
        threshold: 500; // ms
        alerting: true;
      };
      errorRate: {
        threshold: 0.05; // 5%
        alerting: true;
      };
      throughput: {
        threshold: 100; // requests/min
        alerting: false;
      };
    };
    infrastructure: {
      cpuUsage: {
        threshold: 80; // percentage
        alerting: true;
      };
      memoryUsage: {
        threshold: 85; // percentage
        alerting: true;
      };
      diskUsage: {
        threshold: 90; // percentage
        alerting: true;
      };
    };
  };

  logging: {
    level: var.environment === "production" ? "info" : "debug";
    format: "json";
    retention: var.environment === "production" ? "30d" : "7d";
    aggregation: {
      enabled: true;
      destination: "cloudwatch";
    };
  };

  tracing: {
    enabled: true;
    sampling: var.environment === "production" ? 0.1 : 1.0;
    exportFormat: "jaeger";
  };
}

// Alert Configuration
interface AlertConfig {
  rules: Array<{
    name: string;
    condition: string;
    threshold: number;
    duration: string;
    severity: "critical" | "warning" | "info";
    channels: string[];
    escalation: {
      level: number;
      delay: string;
      channels: string[];
    }[];
  }>;
}

const deploymentAlerts: AlertConfig = {
  rules: [
    {
      name: "High Error Rate",
      condition: "error_rate > threshold",
      threshold: 0.05,
      duration: "5m",
      severity: "critical",
      channels: ["slack", "email"],
      escalation: [
        {
          level: 1,
          delay: "10m",
          channels: ["slack", "email", "sms"]
        },
        {
          level: 2,
          delay: "30m",
          channels: ["slack", "email", "sms", "phone"]
        }
      ]
    },
    {
      name: "High Response Time",
      condition: "response_time_p95 > threshold",
      threshold: 1000,
      duration: "10m",
      severity: "warning",
      channels: ["slack"]
    },
    {
      name: "Deployment Health Check Failure",
      condition: "health_check_status != 200",
      threshold: 1,
      duration: "1m",
      severity: "critical",
      channels: ["slack", "email"],
      escalation: [
        {
          level: 1,
          delay: "5m",
          channels: ["slack", "email", "sms"]
        }
      ]
    }
  ]
};
```

## Example Deployment Pipeline Output

```
🚀 DEPLOYMENT PIPELINE EXECUTION
===============================

📋 Pipeline: Production Release v2.3.0
======================================

### 🎯 Release Overview
- **Version**: v2.3.0
- **Environment**: Production
- **Strategy**: Canary Deployment (10% → 50% → 100%)
- **Estimated Duration**: 45 minutes
- **Rollback Ready**: ✅ Yes

### 🔍 Pre-Deployment Validation

#### Quality Gates
- ✅ Type Checking: No errors or warnings
- ✅ Linting: All standards met
- ✅ Unit Tests: 95% coverage (target: 80%)
- ✅ Integration Tests: All passing
- ✅ E2E Tests: Critical paths validated
- ✅ Security Scan: No critical vulnerabilities
- ✅ Performance Benchmarks: All within limits

#### Infrastructure Readiness
- ✅ Database Migrations: Ready to apply
- ✅ Environment Configuration: Validated
- ✅ Secrets Management: All secrets available
- ✅ SSL Certificates: Valid and renewed
- ✅ CDN Configuration: Ready for deployment
- ✅ Monitoring Systems: Operational

### 🏗️ Deployment Execution

#### Stage 1: Build & Package
```
✅ Dependencies installed (2.3s)
✅ Application built (12.1s)
✅ Docker image created (8.7s)
✅ Image scanned for vulnerabilities (4.2s)
✅ Artifacts uploaded to registry (3.1s)
```

#### Stage 2: Database Migrations
```
✅ Migration backup created (1.2s)
✅ Schema validation passed (0.8s)
✅ Migration 001: Applied successfully (2.1s)
✅ Migration 002: Applied successfully (1.5s)
✅ Data integrity check passed (3.4s)
✅ Migration rollback plan verified (1.1s)
```

#### Stage 3: Canary Deployment - 10% Traffic
```
✅ New version deployed to canary (15.2s)
✅ Health checks passing (100%)
✅ 10% traffic routed to new version
⏳ Monitoring for 5 minutes...

📊 Metrics Analysis (5 min window):
- Response Time: 245ms (target: <500ms) ✅
- Error Rate: 0.1% (target: <1%) ✅
- Throughput: 45 req/min (target: >20 req/min) ✅
- CPU Usage: 35% (target: <80%) ✅
- Memory Usage: 42% (target: <85%) ✅

✅ Canary phase 1 successful - Proceeding to 50% traffic
```

#### Stage 4: Canary Deployment - 50% Traffic
```
✅ Traffic increased to 50%
⏳ Monitoring for 10 minutes...

📊 Metrics Analysis (10 min window):
- Response Time: 267ms (target: <500ms) ✅
- Error Rate: 0.2% (target: <1%) ✅
- Throughput: 128 req/min (target: >50 req/min) ✅
- CPU Usage: 58% (target: <80%) ✅
- Memory Usage: 61% (target: <85%) ✅

✅ Canary phase 2 successful - Proceeding to 100% traffic
```

#### Stage 5: Full Deployment
```
✅ 100% traffic routed to new version
✅ Old version scaled down
✅ Health checks passing (100%)
✅ Monitoring alerts cleared
✅ Deployment markers updated
```

### 📈 Post-Deployment Verification

#### Health Checks
- ✅ Application Health: All endpoints responding
- ✅ Database Connectivity: All connections healthy
- ✅ External Services: All integrations working
- ✅ Performance Metrics: All within normal ranges
- ✅ Security Scanning: No new vulnerabilities

#### User Acceptance Testing
- ✅ Login Flow: Working correctly
- ✅ User Dashboard: Loading properly
- ✅ Data Tables: Sorting and filtering working
- ✅ Profile Management: Updates working
- ✅ API Endpoints: All responding correctly

### 🔧 Infrastructure Updates

#### Cloud Resources
- ✅ Vercel Project: Updated with new version
- ✅ Turso Database: Migrations applied successfully
- ✅ Cloudflare DNS: Records updated
- ✅ CDN Cache: Invalidated and refreshed

#### Monitoring Configuration
- ✅ Alert Rules: Updated for new version
- ✅ Dashboards: Updated with new metrics
- ✅ Log Forwarding: Configured and working
- ✅ Performance Monitoring: Baselines updated

### 📊 Deployment Metrics

#### Timing
- **Total Deployment Time**: 42 minutes 18 seconds
- **Build Time**: 12 minutes 5 seconds
- **Migration Time**: 8 minutes 2 seconds
- **Canary Monitoring**: 22 minutes 11 seconds

#### Performance
- **Deployment Success Rate**: 100%
- **Rollback Triggered**: 0 times
- **User Impact**: Zero downtime
- **Error Rate Spike**: None detected

#### Infrastructure
- **Resource Utilization**: Normal (CPU 58%, Memory 61%)
- **Database Performance**: Optimal
- **Network Latency**: Within normal ranges
- **SSL Certificate**: Valid (expires in 89 days)

### ✅ Deployment Summary

**Status**: ✅ SUCCESS
**Deployment ID**: deploy-v2.3.0-2024-01-15-14-30
**Started**: 2024-01-15 14:30:00 UTC
**Completed**: 2024-01-15 15:12:18 UTC
**Duration**: 42m 18s

**Key Achievements**:
- Zero downtime deployment achieved
- All quality gates passed
- Performance metrics improved by 12%
- Security posture maintained
- User experience enhanced

**Next Steps**:
1. Monitor application performance for next 24 hours
2. Collect user feedback on new features
3. Schedule performance review meeting
4. Plan next release cycle

**Rollback Plan**: Available and tested (last tested: 2024-01-14)
**Support Team**: Notified and standing by
**Documentation**: Updated with release notes

This deployment demonstrates excellent execution of our canary deployment strategy with comprehensive monitoring and validation at each stage.
```

## Integration with Team

This skill works seamlessly with:
- **DevOps Engineer** agent for infrastructure management and deployment automation
- **QA Engineer** agent for deployment validation and acceptance testing
- **System Architect** agent for deployment architecture and infrastructure design
- **Code Review Lead** agent for deployment quality gates and standards

## Best Practices

1. **Safety First**: Always have rollback plans and test them regularly
2. **Gradual Rollouts**: Use canary or blue-green deployments to minimize risk
3. **Comprehensive Monitoring**: Monitor all aspects of the deployment process
4. **Automation**: Automate as much as possible to reduce human error
5. **Communication**: Keep all stakeholders informed throughout the deployment process

This skill ensures that deployments are safe, reliable, and well-monitored while providing comprehensive visibility into the deployment process and system health.