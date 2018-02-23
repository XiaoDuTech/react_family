import Mock from 'mockjs';

let Random = Mock.Random;

Mock.mock('/api/user',{
    'name':'@name',
    'intro':'@word(20)'
});