package Competitive;

public class MaxSumNoAdj {
    void maxSum(int []arr,int len){
    	int incl = arr[0];
    	int exc = 0;
    	int nw_exc = 0;
    	for(int i = 1;i<len;i++){
    		nw_exc = incl;
    		incl = max(arr[i] + exc , incl );
    		exc = nw_exc;
    	}
    	System.out.print(max(nw_exc,incl));
    }
    
    int max(int x, int y){
    	if(x>y){return x;}
    	return y;
    }
	public static void main(String[] str){
		int arr[] = {4,1,1, 4, 3,1};
		int len = arr.length;
		MaxSumNoAdj obj = new MaxSumNoAdj();
		obj.maxSum(arr,len);
	}
}
