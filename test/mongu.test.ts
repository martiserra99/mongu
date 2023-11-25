import { mongu } from '../src/index';

it('evaluates expression', () => {
  const expr = {
    fullName: {
      $concat: [{ $toLower: '$name' }, ' ', { $toLower: '$surname' }],
    },
    isAdult: { $gte: ['$age', 18] },
  };
  const vars = { name: 'Marti', surname: 'Serra', age: 24 };
  expect(mongu(expr, vars)).toEqual({
    fullName: 'marti serra',
    isAdult: true,
  });
});

it('evaulates expression with object variable', () => {
  const expr = {
    fullName: {
      $concat: [{ $toLower: '$user.name' }, ' ', { $toLower: '$user.surname' }],
    },
    isAdult: { $gte: ['$user.age', 18] },
  };
  const vars = { user: { name: 'Marti', surname: 'Serra', age: 24 } };
  expect(mongu(expr, vars)).toEqual({
    fullName: 'marti serra',
    isAdult: true,
  });
});

it('ignores $ when using _', () => {
  expect(mongu({ _$gte: ['_$age', 18] })).toEqual({ $gte: ['$age', 18] });
});
