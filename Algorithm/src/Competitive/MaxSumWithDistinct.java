package Competitive;

public class MaxSumWithDistinct {
		void maxSum(int temp[],int len){
			int prev_sum = 0;
			int sum =0;
			int i =0;
			int start_indx = 0;
			
			while(i<len){
				//int tempSum = 0;
				sum =sum + temp[i];
				if(sum > prev_sum ){
					prev_sum =sum;
					//System.out.print("SUM :"+ prev_sum);
				}
				for(int j =i; j> start_indx;--j){
					//tempSum = tempSum + temp[j+1]; 
					if(temp[j-1] == temp [i]){
						prev_sum = prev_sum - temp[i];
						start_indx = j;
						i = j-1;
						
						sum =0;
						break;
					};
				}
				i++;
				
				
				
			}
			System.out.print("SUM :"+ prev_sum);
		}
		public static void main(String str[]){
			MaxSumWithDistinct obj = new MaxSumWithDistinct();
			int arr[] = {1,4,7,1,3,4,1,9,7};
			obj.maxSum(arr, arr.length);
		}
}
