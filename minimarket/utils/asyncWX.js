export const login = ()=>{
    return new Promise((resolve,rejects)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                rejects(err)
            }
        });
    })
}