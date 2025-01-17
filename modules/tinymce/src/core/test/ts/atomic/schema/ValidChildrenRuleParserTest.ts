import { context, describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';

import * as ValidChildrenRuleParser from 'tinymce/core/schema/ValidChildrenRuleParser';

describe('atomic.tinymce.core.schema.ValidChildrenRuleParserTest', () => {
  const testValidChildrenRuleParser = (testCase: { input: string; expected: ValidChildrenRuleParser.ValidChildrenRule[] }) => {
    const elements = ValidChildrenRuleParser.parseValidChildrenRules(testCase.input);
    assert.deepEqual(elements, testCase.expected);
  };

  context('Empty rules', () => {
    it('Parse empty string', () => testValidChildrenRuleParser({ input: '', expected: [ ] }));
    it('Parse whitespace string', () => testValidChildrenRuleParser({ input: '   ', expected: [ ] }));
  });

  context('Inline and block rules', () => {
    it('Replace children', () => testValidChildrenRuleParser({
      input: 'foo[bar|baz]',
      expected: [
        {
          name: 'foo',
          operation: 'replace',
          validChildren: [
            { preset: false, name: 'bar' },
            { preset: false, name: 'baz' }
          ]
        }
      ]
    }));

    it('Replace children in multiple parents', () => testValidChildrenRuleParser({
      input: 'foo1[bar],foo2[baz]',
      expected: [
        {
          name: 'foo1',
          operation: 'replace',
          validChildren: [
            { preset: false, name: 'bar' }
          ]
        },
        {
          name: 'foo2',
          operation: 'replace',
          validChildren: [
            { preset: false, name: 'baz' }
          ]
        }
      ]
    }));

    it('Add children', () => testValidChildrenRuleParser({
      input: '+foo[bar|baz]',
      expected: [
        {
          name: 'foo',
          operation: 'add',
          validChildren: [
            { preset: false, name: 'bar' },
            { preset: false, name: 'baz' }
          ]
        }
      ]
    }));

    it('Add children to multiple parents', () => testValidChildrenRuleParser({
      input: '+foo1[bar],+foo2[baz]',
      expected: [
        {
          name: 'foo1',
          operation: 'add',
          validChildren: [
            { preset: false, name: 'bar' }
          ]
        },
        {
          name: 'foo2',
          operation: 'add',
          validChildren: [
            { preset: false, name: 'baz' }
          ]
        }
      ]
    }));

    it('Add children presets', () => testValidChildrenRuleParser({
      input: '+foo[@bar|@baz]',
      expected: [
        {
          name: 'foo',
          operation: 'add',
          validChildren: [
            { preset: true, name: 'bar' },
            { preset: true, name: 'baz' }
          ]
        }
      ]
    }));

    it('Remove children', () => testValidChildrenRuleParser({
      input: '-foo[bar|baz]',
      expected: [
        {
          name: 'foo',
          operation: 'remove',
          validChildren: [
            { preset: false, name: 'bar' },
            { preset: false, name: 'baz' }
          ]
        }
      ]
    }));

    it('Remove children from multiple parents', () => testValidChildrenRuleParser({
      input: '-foo1[bar],-foo2[baz]',
      expected: [
        {
          name: 'foo1',
          operation: 'remove',
          validChildren: [
            { preset: false, name: 'bar' }
          ]
        },
        {
          name: 'foo2',
          operation: 'remove',
          validChildren: [
            { preset: false, name: 'baz' }
          ]
        }
      ]
    }));

    it('Remove children presets', () => testValidChildrenRuleParser({
      input: '-foo[@bar|@baz]',
      expected: [
        {
          name: 'foo',
          operation: 'remove',
          validChildren: [
            { preset: true, name: 'bar' },
            { preset: true, name: 'baz' }
          ]
        }
      ]
    }));
  });
});

