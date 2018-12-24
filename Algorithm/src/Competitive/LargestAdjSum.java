package Competitive;

public class LargestAdjSum {
	void largestSum(int[] arr){
		int sum=-1000000000;
		for(int i=0;i< arr.length-1;i++){
			int temp = arr[i] +arr[i+1];
			if(temp>sum){
				sum=temp;
			}
			else{}
		}
		System.out.print("LARGEST SUM : " + sum);
	}
	
	public static void main(String []str){
		int[] arr = new int[]{1,45,11,78,132,33,1,90,3452,9,45,362,619,85,38,22};
		LargestAdjSum obj = new LargestAdjSum();
		obj.largestSum(arr);
	}
}
