/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NetworkManagementClient, NetworkManagementModels } from 'azure-arm-network';
import { Progress } from "vscode";
import { AzureWizardExecuteStep, createAzureClient } from "vscode-azureextensionui";
import { nonNullProp, nonNullValueAndProp } from '../../utils/nonNull';
import { IVirtualMachineWizardContext } from './IVirtualMachineWizardContext';

export class SubnetCreateStep extends AzureWizardExecuteStep<IVirtualMachineWizardContext> {
    public priority: number = 230;

    public async execute(context: IVirtualMachineWizardContext, progress: Progress<{ message?: string | undefined; increment?: number | undefined }>): Promise<void> {
        const networkClient: NetworkManagementClient = createAzureClient(context, NetworkManagementClient);

        const rgName: string = nonNullValueAndProp(context.resourceGroup, 'name');
        const vnetName: string = nonNullValueAndProp(context.virtualNetwork, 'name');
        // this is the name the portal uses
        const subnetName: string = 'default';
        const subnetProps: NetworkManagementModels.Subnet = { addressPrefix: nonNullProp(context, 'addressPrefix'), name: subnetName };
        progress.report({ message: 'Creating subnet...' });

        context.subnet = await networkClient.subnets.createOrUpdate(rgName, vnetName, subnetName, subnetProps);
    }
    public shouldExecute(context: IVirtualMachineWizardContext): boolean {
        return !context.subnet;
    }

}