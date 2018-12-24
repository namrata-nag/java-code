package Competitive;
//import java.util.*;
public class LargestSumSubarr {
	int sumSubarr(int temp[]){
		int len = temp.length;
		int endSum = Integer.MIN_VALUE;
		int sum =0;
		for(int i=0;i< len ; i++){
			sum =sum + temp[i];
			if(sum>endSum){
				endSum =sum;
			}
			if(sum<0){
				sum =0 ;
			}
			
		}
		return endSum;
	}
	public static void main(String[] str){
		int arr[] = {-2, -3, 4, -1, -2, 11, -5, -3};
		LargestSumSubarr obj = new LargestSumSubarr();
		System.out.println(obj.sumSubarr(arr));
		
	}
}
