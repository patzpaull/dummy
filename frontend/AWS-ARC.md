- [BaridiBaridi Proposed AWS Architecture :mage:](#baridibaridi-proposed-aws-architecture)
  * [Overview](#overview)
  * [Components](#components)
    + [Availability Zones](#availability-zones)
    + [Load Balancer:](#load-balancer)
    + [Lambda Function](#lambda-function)
    + [Keycloak SSO ](#keycloak-sso)
    + [API Gateway:](#api-gateway)
    + [AWS Fargate:](#aws-fargate)
    + [NAT Gateway](#nat-gateway)
    + [Private Subnet Resources](#private-subnet-resources)
    + [AWS Direct Connect](#aws-direct-connect)
  * [Considerations](#considerations)
  * [Segregation of Public and Private Resources](#segregation-of-public-and-private-resources)
  * [Redundancy and Scalability](#redundancy-and-scalability)
- [Additional Notes](#additional-notes)



# BaridiBaridi Proposed AWS Architecture
# 🧙‍♂️

![BaridiBaridi Cloud Architecture](https://github.com/patzpaull/dummy/assets/159112522/1bdce07e-bd0a-4b01-821d-dba9b05075ee)

## Overview:
- This document provides an overview of the <strong>New AWS Infrastructure</strong> designed for a Europe-based application. 
- The architecture spans across two availability zones (AZs) within the EU West region.
- For access to the Diagram use this link: [LucidChart BaridiBaridi Cloud Architectural Diagram](https://lucid.app/lucidchart/9efe005b-0cb5-4211-b47c-4fed21c241c4/edit?viewport_loc=-345%2C-5402%2C2267%2C1471%2C0_0&invitationId=inv_5ecfbd35-132e-4146-a09d-7aafb7ec5227)

## Components:

### Availability Zones:

- AZ1: One private subnet for internal resources, including Keycloak authentication integration and an instance running Fargate. Additionally, there is one public subnet housing a dashboard UI to authenticate user traffic before reaching the private subnet.

- AZ2: Consists of one public subnet with oncoming traffic through the internet gateway with the subnet containing a Jumpbox for user to SSH through. Also includes a private subnet similar to AZ1 private subnet configuration to ensure high availability.

### Load Balancer:
- Implemented to manage traffic access between public and private subnets, ensuring <strong>load distribution and high availability</strong>.

### Lambda Function:
- Utilized to redirect authentication through <strong>Keycloak for API Gateway authorization</strong>. 
- Unauthorized users attempting to access private subnets are redirected to authenticate through the public subnets and API Gateway for <strong>Keycloak Single Sign-On (SSO)</strong>.

### Keycloak SSO:
[BaridiBaridi SSO Dashboard](https://sso.baridibaridi.co.tz/)
- Implemented to monitor and allow token authorization for the defined keycloak users. 
- Any unregistered accounts will be termed as <strong>unauthorized and traffic returned through the API gateway</strong> to check for authorization. 
- A Lambda auth function trigger is setup for that purpose and redirects through the API gateway once a user's status is Verified as Authenticated.

### API Gateway:
- Responsible for authorizing inbound traffic based on Keycloak authentication, enhancing security and access control.

### AWS Fargate:
- Utilized for its Ease of configuration and provisioning.
- Ensuring cost effectiveness and high availability is observed with both Private subnets from the AZs in the region running fargate instances. 

### NAT Gateway: 
- Attached to one of the public subnets for outbound internet access. 
- Facilitating communication between private resources and external services.
<br><br><br>
<strong>*OTHER COMPONENTS*</strong>
### Private Subnet Resources:
- In private subnets, resources include an <strong>S3 Bucket</strong> and a <strong>PostgreSQL Server</strong> for handling storage and SQL operations securely.

### AWS Direct Connect:
- Expands the infrastructure to connect to a corporate data center through an established connection.
- AWS Direct Connect is connected to our VPC through a Virtual Private Gateway
- Receiving its traffic redirected through an AWS router from a client router.
- This traffic originates from the corporate gateway and interconnects in a Direct Connect location enabled by AWS Direct Connect.

## Considerations:

- The Components and their connections have been represented in the diagram to facilitate understanding on a general/neutral standpoint for all stakeholders.
- Emphasis on the flow of data and authentication between components has been implemented to demonstrate the system's operation and flow.


## Segregation of Public and Private Resources:

- The segregation of public and private resources in separate availability zones aims to maintain security and control access to sensitive information on our resources. 
- Possible by limiting the traffic flow from clients to the intended resources or actions they look to acquire without compromising the internal resources and operations reserved for in house operations.

## Redundancy and Scalability:

- Redundancy and scalability in the design has been illustrated by showcasing multiple availability zones (AZs).
- Ensures resilience and high availability of the system with pre configured set ups that leave room to showcase scalability demands in future.

# Additional Notes:
- The diagramming of the architecture looks to be visually appealing and professional, enhancing comprehension 
- keeps focus on simplicity in the layout to facilitate ease in communication of the architecture.
