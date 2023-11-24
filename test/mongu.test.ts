import { mongu, Value, Object } from '../src/index';

describe('mongu', () => {
  it('should evaulate the expression', () => {
    const expr: Value = {
      fullName: {
        $concat: [{ $toLower: '$name' }, ' ', { $toLower: '$surname' }],
      },
      isAdult: {
        $gte: ['$age', 18],
      },
    };
    const vars: Object<Value> = {
      name: 'Marti',
      surname: 'Serra',
      age: 24,
    };
    expect(mongu(expr, vars)).toEqual({
      fullName: 'marti serra',
      isAdult: true,
    });
  });

  it('should ignore $ if there is _ in front of it', () => {
    const expr: Value = {
      fullName: {
        _$concat: [{ _$toLower: '_$name' }, ' ', { _$toLower: '_$surname' }],
      },
      isAdult: {
        _$gte: ['_$age', 18],
      },
    };
    const vars: Object<Value> = {
      name: 'Marti',
      surname: 'Serra',
      age: 24,
    };
    expect(mongu(expr, vars)).toEqual({
      fullName: {
        $concat: [{ $toLower: '$name' }, ' ', { $toLower: '$surname' }],
      },
      isAdult: {
        $gte: ['$age', 18],
      },
    });
  });
});
