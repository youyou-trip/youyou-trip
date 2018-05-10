/**
 * 根据距离矩阵计算最短路径
 * @param {Array} D 距离矩阵
 */

var TSP = function (D,n) {
    var i, j, k, min, temp;
    var b = Math.pow(2, n - 1);

    //申请二维数组F和M
    var F = []
    var M = []
    for (i = 0; i < n; i++) {
        F[i] = []//每行有2的n-1次方列
        M[i] = []
    }
    //初始化F[][]和M[][]
    for (i = 0; i < b; i++)
        for (j = 0; j < n; j++) {
            F[j][i] = -1;
            M[j][i] = -1;
        }

    //给F的第0列赋初值
    for (i = 0; i < n; i++)
        F[i][0] = D[i][n-1];

    //遍历并填表
    for (i = 0; i < b; i++)
        for (j = 0; j < n; j++) {
            if ((Math.pow(2, j - 1) & i) == 0)//结点j不在i表示的集合中
            {
                min = Infinity;
                for (k = 1; k < n; k++)
                    if ((Math.pow(2, k - 1) & i))//非零表示结点k在集合中
                    {
                        temp = D[j][k] + F[k][i - Math.pow(2, k - 1)];
                        if (temp < min) {
                            min = temp;
                            F[j][i] = min;//总最优解
                            M[j][i] = k;
                            distance = min;
                        }
                    }
            }
        }
   // console.log("最短路径长度：" + distance);//最短路径长度
    let route = []
    for (i = b - 1, j = 0; i > 0;)//i的二进制是5个1，表示集合{1,2,3,4,5}
    {
        route.push(j)
        j = M[j][i];//下一步去往哪个结点
        i = Math.floor(i - Math.pow(2, j - 1));//从i中去掉j结点
    }
    route.push(j)
    return route
}

module.exports = TSP