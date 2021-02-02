/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ComputeManagementClient } from '@azure/arm-compute';
import { NetworkManagementClient } from '@azure/arm-network';
import { ResourceManagementClient } from '@azure/arm-resources';
import { createAzureClient, ISubscriptionContext } from 'vscode-azureextensionui';

// Lazy-load @azure packages to improve startup performance.
// NOTE: The client is the only import that matters, the rest of the types disappear when compiled to JavaScript

export async function createComputeClient<T extends ISubscriptionContext>(context: T): Promise<ComputeManagementClient> {
    return createAzureClient(context, (await import('@azure/arm-compute')).ComputeManagementClient);
}

export async function createNetworkClient<T extends ISubscriptionContext>(context: T): Promise<NetworkManagementClient> {
    return createAzureClient(context, (await import('@azure/arm-network')).NetworkManagementClient);
}

export async function createResourceClient<T extends ISubscriptionContext>(context: T): Promise<ResourceManagementClient> {
    return createAzureClient(context, (await import('@azure/arm-resources')).ResourceManagementClient);
}
