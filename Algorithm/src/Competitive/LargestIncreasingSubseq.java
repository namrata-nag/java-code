package Competitive;

public class LargestIncreasingSubseq {
	public static void main(String str[]){
		int arr[] ={10,22,9,33,21,50,41,60,80};
		int len = arr.length;
		int lis[] = new int[len];
		for(int i =0;i<len;i++){
			lis[i] =1;
		}
		for(int i =1;i<len;i++){
			for(int j=0;j<i;j++){
				if(arr[i]>arr[j] && (lis[i]<lis[j]+1)){
					lis[i] =lis[j]+1;
				}
			}
		}
		int max= Integer.MIN_VALUE;
		for ( int i = 0; i < len; i++ ) 
            if ( max < lis[i] ) 
               max = lis[i]; 
		
		System.out.print(max);
	}
}
