// ast-processor.ts
import { FieldDef, ModelDef, EnumDef } from './types';

const processField = (p: any): FieldDef => ({
    name: p.name,
    type: typeof p.fieldType === 'string' ? p.fieldType : p.fieldType.name,
    isArray: !!p.array,
    isOptional: !!p.optional || (p.attributes || []).some((attr: any) => attr.name === 'nullable'),
    comment: p.comment,
});

export const processModel = (node: any, isType: boolean): ModelDef => ({
    name: node.name,
    isType,
    comments: (node.comments || []).map((c: any) => c.text),
    fields: (node.properties || [])
        .filter((p: any) => p.type === 'field')
        .map(processField),
});

export const processEnum = (node: any): EnumDef => ({
    name: node.name,
    values: node.enumerators
        .filter((e: any) => e.type === 'enumerator')
        .map((e: any) => e.name),
});
